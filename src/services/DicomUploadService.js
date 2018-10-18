import { httpErrorToStr } from '../utils/helpers';
const DICOM = require('dicomweb-client');

class DicomUploadService {
  async smartUpload(files, url, authToken, uploadCallback, cancellationToken) {
    /* eslint-disable */
    const CHUNK_SIZE = 1;
    const MAX_PARALLEL_JOBS = 50; // FIXME: tune MAX_PARALLEL_JOBS number
    //
    let filesArray = Array.from(files);
    if (filesArray.length === 0) {
      console.warn('No files are supplied for uploading');
      return;
    }
    let parallelJobsCount = Math.min(filesArray.length, MAX_PARALLEL_JOBS);
    let completed = false;

    const processJob = async (resolve, reject) => {
      while (filesArray.length > 0) {
        if (cancellationToken.get()) return;
        let chunk = filesArray.slice(0, CHUNK_SIZE);
        filesArray = filesArray.slice(CHUNK_SIZE);
        const error = null;
        try {
          await this.simpleUpload(chunk, url, authToken);
        } catch (err) {
          // It looks like a stupid bug of Babel that err is not an actual Exception object
          error = httpErrorToStr(err);
        }
        chunk.forEach(file => uploadCallback(file.fileId, error));
        if (!completed && filesArray.length === 0) {
          completed = true;
          resolve();
          return;
        }
      }
    };

    await new Promise(resolve => {
      for (let i = 0; i < parallelJobsCount; i++) {
        processJob(resolve);
      }
    });
  }

  async simpleUpload(files, url, authToken) {
    /* eslint-disable */
    files = Array.from(files);
    if (files.length === 0) return;
    const client = new DICOM.api.DICOMwebClient({
      url,
      headers: { Authorization: 'Bearer ' + authToken }
    });
    const loadedFiles = await Promise.all(Array.from(files).map(f => this.readFile(f)));
    const contents = loadedFiles.map(f => f.content);
    await client.storeInstances({ datasets: contents });
  }

  readFile(file) {
    const promise = new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          size: file.size,
          type: file.type,
          content: reader.result
        });
      };
      reader.onerror = error => reject(error);
      reader.readAsArrayBuffer(file);
    });
    return promise;
  }
}

export default new DicomUploadService();
