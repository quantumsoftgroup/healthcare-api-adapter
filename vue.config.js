// module.exports = {
//   chainWebpack: config => {
//     const svgRule = config.module.rule('svg');
//     svgRule.uses.clear();
//     svgRule
//       .use('vue-svg-loader')
//       .loader('vue-svg-loader')
//       .options({
//         svgo: {
//           plugins: [
//             {
//               cleanupAttrs: false
//             },
//             {
//               removeDoctype: true
//             },
//             {
//               removeXMLProcInst: true
//             },
//             {
//               removeComments: true
//             },
//             {
//               removeMetadata: true
//             },
//             {
//               removeTitle: true
//             },
//             {
//               removeDesc: true
//             },
//             {
//               removeUselessDefs: false
//             },
//             {
//               removeEditorsNSData: false
//             },
//             {
//               removeEmptyAttrs: false
//             },
//             {
//               removeHiddenElems: false
//             },
//             {
//               removeEmptyText: false
//             },
//             {
//               removeEmptyContainers: false
//             },
//             {
//               removeViewBox: false
//             },
//             {
//               cleanupEnableBackground: false
//             },
//             {
//               convertStyleToAttrs: false
//             },
//             {
//               convertColors: false
//             },
//             {
//               convertPathData: false
//             },
//             {
//               convertTransform: false
//             },
//             {
//               removeUnknownsAndDefaults: false
//             },
//             {
//               removeNonInheritableGroupAttrs: false
//             },
//             {
//               removeUselessStrokeAndFill: false
//             },
//             {
//               removeUnusedNS: false
//             },
//             {
//               cleanupIDs: true
//             },
//             {
//               cleanupNumericValues: false
//             },
//             {
//               moveElemsAttrsToGroup: false
//             },
//             {
//               moveGroupAttrsToElems: false
//             },
//             {
//               collapseGroups: false
//             },
//             {
//               removeRasterImages: false
//             },
//             {
//               mergePaths: false
//             },
//             {
//               convertShapeToPath: false
//             },
//             {
//               sortAttrs: false
//             },
//             {
//               removeDimensions: false
//             }
//           ]
//         }
//       });
//   }
// };
