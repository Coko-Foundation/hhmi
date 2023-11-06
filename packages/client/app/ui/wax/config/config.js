/* eslint-disable import/no-extraneous-dependencies */
import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  ImageService,
  ImageToolGroupService,
  LinkService,
  ListsService,
  ListToolGroupService,
  BaseService,
  BaseToolGroupService,
  DisplayTextToolGroupService,
  MathService,
  FullScreenService,
  FullScreenToolGroupService,
  SpecialCharactersService,
  SpecialCharactersToolGroupService,
  EditorInfoToolGroupServices,
  BottomInfoService,
} from 'wax-prosemirror-services'

import { QuestionsService } from 'wax-questions-service'
import { TablesService, columnResizing } from 'wax-table-service'

import { DefaultSchema } from 'wax-prosemirror-core'

export default {
  MenuService: [
    {
      templateArea: 'mainMenuToolBar',
      toolGroups: [
        'Base',
        {
          name: 'Annotations',
          exclude: ['linkTool', 'SmallCaps'],
          // more: [
          //   'Superscript',
          //   'Subscript',
          //   'SmallCaps',
          //   'Underline',
          //   'StrikeThrough',
          // ],
        },
        'Lists',
        'Images',
        'Tables',
        // 'QuestionsDropDown',
        'FullScreen',
      ],
    },
    {
      templateArea: 'fillTheGap',
      toolGroups: ['FillTheGap'],
    },
    {
      templateArea: 'MultipleDropDown',
      toolGroups: ['MultipleDropDown'],
    },
  ],

  SchemaService: DefaultSchema,
  PmPlugins: [columnResizing()],

  ImageService: { showAlt: true },

  services: [
    new QuestionsService(),

    new ListsService(),
    new LinkService(),
    new InlineAnnotationsService(),
    new ImageService(),
    new TablesService(),
    new BaseService(),
    new BaseToolGroupService(),
    new ImageToolGroupService(),
    new AnnotationToolGroupService(),
    new ListToolGroupService(),
    new DisplayTextToolGroupService(),
    new MathService(),
    new FullScreenService(),
    new FullScreenToolGroupService(),
    new SpecialCharactersService(),
    new SpecialCharactersToolGroupService(),
    new EditorInfoToolGroupServices(),
    new BottomInfoService(),
  ],
}
