const DICOM = require('dicomweb-client');

class DicomUploadService {
  async smartUpload(files, url, authToken) {
    /* eslint-disable */
    const CHUNK_SIZE = 1;
    const PARALLEL_JOBS = 50;
    //
    let filesArray = Array.from(files);
    let completed = false;

    const processJob = async (resolve, reject) => {
      while (filesArray.length > 0) {
        let chunk;
        if (filesArray.length > CHUNK_SIZE) {
          chunk = filesArray.slice(0, CHUNK_SIZE);
          filesArray = filesArray.slice(CHUNK_SIZE);
        } else {
          chunk = filesArray.slice(CHUNK_SIZE);
          filesArray = [];
        }
        try {
          await this.simpleUpload(chunk, url, authToken);
        } catch (err) {
          reject();
          // TODO: add error handling
          return;
        }
        if (!completed && filesArray.length === 0) {
          completed = true;
          resolve();
          return;
        }
      }
    };

    await new Promise((resolve, reject) => {
      for (let i = 0; i < PARALLEL_JOBS; i++) {
        processJob(resolve, reject);
      }
    });
  }

  async simpleUpload(files, url, authToken) {
    /* eslint-disable */
    files = Array.from(files);
    const client = new DICOM.api.DICOMwebClient({
      url,
      headers: { Authorization: 'Bearer ' + authToken }
    });
    const loadedFiles = await Promise.all(Array.from(files).map(f => this.readFile(f)));
    console.log('Uploading files: ');
    loadedFiles.map(f => console.log('   ' + f.name));
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
