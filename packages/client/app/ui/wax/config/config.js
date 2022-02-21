// import { emDash, ellipsis } from 'prosemirror-inputrules'
import { columnResizing, tableEditing } from 'prosemirror-tables'
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
  MultipleDropDownToolGroupService,
  FillTheGapQuestionService,
  FillTheGapToolGroupService,
} from 'wax-prosemirror-services'

import { DefaultSchema } from 'wax-prosemirror-utilities'
import { WaxSelectionPlugin } from 'wax-prosemirror-plugins'
// import invisibles, { hardBreak } from '@guardian/prosemirror-invisibles'

export default {
  MenuService: [
    {
      templateArea: 'mainMenuToolBar',
      toolGroups: [
        { name: 'Base', exclude: ['Save'] },
        {
          name: 'Annotations',
          more: [
            'Superscript',
            'Subscript',
            'SmallCaps',
            'Underline',
            'StrikeThrough',
          ],
        },
        'Lists',
        'Images',
        'Tables',
        'MultipleDropDown',
        'FillTheGap',
        'FullScreen',
      ],
    },
  ],

  SchemaService: DefaultSchema,
  // RulesService: [emDash, ellipsis],

  PmPlugins: [columnResizing(), tableEditing(), WaxSelectionPlugin],

  services: [
    new MultipleChoiceQuestionService(),
    new MultipleDropDownToolGroupService(),
    new FillTheGapQuestionService(),
    new FillTheGapToolGroupService(),
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
