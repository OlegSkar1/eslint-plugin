'use strict';

const { isRelativePath } = require('../helpers');
const micromatch = require('micromatch');

module.exports = {
  meta: {
    messages: {
      publicApi: 'Абсолютный импорт разрешен только из PublicApi (index.ts)',
      testingPublicApi:
        'Тестовые данные необходимо импортировать из PublicApi (testing.ts)',
    },
    type: 'problem',
    docs: {
      description: 'Prohibits imports not from public api',
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
        },
        testFilesPatterns: {
          type: 'array',
        },
      },
    ],
  },

  create(context) {
    const { alias = '', testFilesPatterns = [] } = context.options[0] ?? {};

    return {
      ImportDeclaration(node) {
        const checkingLayers = {
          pages: 'pages',
          widgets: 'widgets',
          features: 'features',
          entities: 'entities',
        };

        const value = node.source.value;

        const currentFilePath = context.getFilename();

        const isCurrentFileTesting = testFilesPatterns.some((pattern) =>
        micromatch.isMatch(currentFilePath, pattern)
      );

        const pathTo = alias ? value.replace(`${alias}/`, '') : value;

        if (isRelativePath(pathTo)) return;

        // [entities, Article, model, ...other]
        const segments = pathTo.split('/');

        const layer = segments[0];

        if (!checkingLayers[layer]) return;

        const isNotImportFromPublicApi = segments.length > 2;

        // [entities, Article, testing]
        const isTestingPublicApi =
          segments[2] === 'testing' && segments.length < 4;

        if (isNotImportFromPublicApi && !isTestingPublicApi) {
          context.report({
            node,
            messageId: 'publicApi',
          });
        }

        if (isTestingPublicApi) {

          if (!isCurrentFileTesting) {
            context.report({
              node,
              messageId: 'testingPublicApi',
            });
          }
        }
      },
    };
  },
};
