import { tableEditing } from 'prosemirror-tables'
import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  ImageService,
  ImageToolGroupService,
  LinkService,
  ListsService,
  ListToolGroupService,
  TablesService,
  TableToolGroupService,
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
  MultipleChoiceQuestionService,
  FillTheGapQuestionService,
  MatchingService,
  MultipleDropDownService,
  EssayService,
  QuestionsDropDownToolGroupService,
} from 'wax-prosemirror-services'

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
        'QuestionsDropDown',
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
  PmPlugins: [tableEditing()],

  ImageService: { showAlt: true },

  services: [
    new FillTheGapQuestionService(),
    new MatchingService(),
    new MultipleChoiceQuestionService(),
    new MultipleDropDownService(),
    new EssayService(),
    new QuestionsDropDownToolGroupService(),

    new ListsService(),
    new LinkService(),
    new InlineAnnotationsService(),
    new ImageService(),
    new TablesService(),
    new BaseService(),
    new BaseToolGroupService(),
    new TableToolGroupService(),
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
