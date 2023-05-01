'use strict';

const { isRelativePath } = require('../helpers');

module.exports = {
  meta: {
    messages: {
      someMessageId: 'Абсолютный импорт разрешен только из PublicApi (index.ts)',
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
      },
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias || '';

    return {
      ImportDeclaration(node) {

        const checkingLayers = {
          pages: 'pages',
          widgets: 'widgets',
          features: 'features',
          entities: 'entities',
        };
        
        const value = node.source.value;

        const pathTo = alias ? value.replace(`${alias}/`, '') : value;

        if (isRelativePath(pathTo)) return;

        // [entities, Article, model, ...other]
        const segments = pathTo.split('/');

        const layer = segments[0];

        if (!checkingLayers[layer]) return;

        const isNotImportFromPublicApi = segments.length > 2;

        if (isNotImportFromPublicApi) {
          context.report({
            node,
            messageId: 'someMessageId',
          });
        }
      },
    };
  },
};