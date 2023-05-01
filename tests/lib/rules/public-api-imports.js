/**
 * @fileoverview Prohibits imports not from public api
 * @author Oleg
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/public-api-imports'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});
ruleTester.run('public-api-imports', rule, {
  valid: [
    {
      code: "import { getArticleData } from '@/entities/Article';",
      errors: [],
      options: [
        {
          alias: '@',
        },
      ],
    },
    {
      code: " import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';",
      errors: [],
      options: [
        {
          alias: '@',
        },
      ],
    },
  ],

  invalid: [
    {
      code: "import { getArticleData } from '@/entities/Article/model/selectors/getArticleData/getArticleData';",
      errors: [{ message: 'Абсолютный импорт разрешен только из PublicApi (index.ts)' }],
      options: [
        {
          alias: '@',
        },
      ],
    },
  ],
});
