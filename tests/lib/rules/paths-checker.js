/**
 * @fileoverview checking absolute paths
 * @author Oleg
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/paths-checker'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});
ruleTester.run('paths-checker', rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "import { NotificationType } from '../../model/types/notification';",
      errors: [
        { message: 'В рамках одного модуля путь должен быть относительным' },
      ],
    },
  ],
});
