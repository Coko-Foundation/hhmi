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
import { TablesService, tableEditing } from 'wax-table-service'

import { DefaultSchema } from 'wax-prosemirror-core'

export default {
  MenuService: [
    {
      templateArea: 'mainMenuToolBar',
      toolGroups: [
        // 'Base',
        {
          name: 'Annotations',
          exclude: ['linkTool', 'SmallCaps'],
        },
        { name: 'Lists', exclude: ['BlockQuote'] },
        'Images',
        'Tables',
        'FullScreen',
      ],
    },
  ],

  SchemaService: DefaultSchema,
  PmPlugins: [tableEditing()],

  ImageService: {
    showAlt: true,
    showLongDesc: true,
    handleAddedRemovedImages: () => {},
  },

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
