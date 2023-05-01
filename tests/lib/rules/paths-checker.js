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
    {
      filename:
        'C:\\study\\production_project\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'",
      errors: [],
    },
  ],

  invalid: [
    {
      filename:
        'C:\\study\\production_project\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { fetchProfileData } from 'features/EditableProfileCard/model/services/fetchProfileData/fetchProfileData'",
      errors: [{ message: 'В рамках одного модуля путь должен быть относительным' }],
    },
    {
      filename:
        'C:\\study\\production_project\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { fetchProfileData } from '@/features/EditableProfileCard/model/services/fetchProfileData/fetchProfileData'",
      errors: [{ message: 'В рамках одного модуля путь должен быть относительным' }],
      options: [
        {
          alias: '@'
        }
      ]
    },
  ],
});
