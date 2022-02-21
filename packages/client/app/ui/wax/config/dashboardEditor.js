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
  MultipleChoiceToolGroupService,
  FillTheGapQuestionService,
  FillTheGapToolGroupService,
} from 'wax-prosemirror-services'

import { DefaultSchema } from 'wax-prosemirror-utilities'
import { WaxSelectionPlugin } from 'wax-prosemirror-plugins'
// import invisibles, { hardBreak } from '@guardian/prosemirror-invisibles'

export default {
  SchemaService: DefaultSchema,
  // RulesService: [emDash, ellipsis],

  PmPlugins: [columnResizing(), tableEditing(), WaxSelectionPlugin],

  services: [
    new MultipleChoiceQuestionService(),
    new MultipleChoiceToolGroupService(),
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
