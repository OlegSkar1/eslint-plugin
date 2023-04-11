'use strict';

const path = require('path');

module.exports = {
  meta: {
    messages: {
      someMessageId: 'В рамках одного модуля путь должен быть относительным',
    },
    type: 'suggestion',
    docs: {
      description: 'checking absolute paths in fsd slices',
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const pathTo = node.source.value;

        const pathFrom = context.getFilename();

        if (shouldRelativePath(pathTo, pathFrom)) {
          context.report({
            node,
            messageId: 'someMessageId',
          });
        }
      },
    };
  },
};

function isRelativePath(path) {
  path === '.' || path.startsWith('./') || path.startsWith('../');
}

const pathList = {
  pages: 'pages',
  widgets: 'widgets',
  features: 'features',
  entities: 'entities',
  shared: 'shared',
};

function shouldRelativePath(to, from) {
  if (isRelativePath(to)) {
    return false;
  }

  const toArray = to.split('/');
  const toLayer = toArray[0];
  const toSlice = toArray[1];

  if (!toLayer || !toSlice || !pathList[toLayer]) {
    return false;
  }

  const normalizePath = path.toNamespacedPath(from);
  const projectFrom = normalizePath.split('src')[1];

  const fromArray = projectFrom.split('\\');

  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if (!fromLayer || !fromSlice || !pathList[fromLayer]) {
    return false;
  }

  return toLayer === fromLayer && toSlice === fromSlice;
}
