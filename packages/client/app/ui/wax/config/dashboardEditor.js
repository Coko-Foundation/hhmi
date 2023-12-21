/* eslint-disable import/no-extraneous-dependencies */
import {
  InlineAnnotationsService,
  ImageService,
  LinkService,
  ListsService,
  BaseService,
  MathService,
  FullScreenService,
  SpecialCharactersService,
  BottomInfoService,
} from 'wax-prosemirror-services'
import { TablesService /* columnResizing */ } from 'wax-table-service'

import { DefaultSchema } from 'wax-prosemirror-core'

export default {
  SchemaService: DefaultSchema,
  // PmPlugins: [columnResizing()],

  services: [
    new ListsService(),
    new LinkService(),
    new InlineAnnotationsService(),
    new ImageService(),
    new TablesService(),
    new BaseService(),
    new MathService(),
    new FullScreenService(),
    new SpecialCharactersService(),
    new BottomInfoService(),
  ],
}
