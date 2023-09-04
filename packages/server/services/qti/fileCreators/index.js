const fs = require('fs')
const xml = require('xml')

const prepareAssessmentItem = questionData => {
  const assessmentJson = {
    assessmentItem: [
      {
        _attr: {
          adaptive: 'false',
          identifier: questionData.id,
          timeDependent: 'false',
          title: 'Question',
          xmlns: 'http://www.imsglobal.org/xsd/imsqti_v2p1',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:schemaLocation':
            'http://www.imsglobal.org/xsd/imsqti_v2p1  http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd',
        },
      },
      {
        // responseDeclaration: [],
      },
      {
        outcomeDeclaration: [
          {
            _attr: {
              baseType: 'float',
              cardinality: 'single',
              identifier: 'SCORE',
            },
          },
          {
            defaultValue: [
              {
                value: 0,
              },
            ],
          },
        ],
      },
      {
        itemBody: [],
      },
      {
        outcomeDeclaration: [
          {
            _attr: {
              baseType: 'identifier',
              cardinality: 'single',
              identifier: 'FEEDBACK',
            },
          },
        ],
      },
    ],
  }

  return assessmentJson
}

const prepareAssessmentTest = (id, resources) => ({
  assessmentTest: [
    {
      _attr: {
        identifier: id,
        title: 'Test',
        xmlns: 'http://www.imsglobal.org/xsd/imsqti_v2p1',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xsi:schemaLocation':
          'http://www.imsglobal.org/xsd/imsqti_v2p1 http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd',
      },
    },
    {
      outcomeDeclaration: [
        {
          _attr: {
            baseType: 'float',
            cardinality: 'single',
            identifier: 'SCORE',
          },
        },
        {
          defaultValue: [
            {
              value: 0,
            },
          ],
        },
      ],
    },
    {
      testPart: [
        {
          _attr: {
            identifier: 'testid',
            navigationMode: 'nonlinear',
            submissionMode: 'individual',
          },
        },
        {
          assessmentSection: [
            {
              _attr: {
                identifier: 'sectionid',
                title: 'title',
                visible: 'true',
              },
            },
            {
              rubricBlock: [
                {
                  _attr: {
                    view: 'candidate',
                  },
                },
              ],
            },
            ...Object.keys(resources).map(assessmentItem => ({
              assessmentItemRef: [
                {
                  _attr: {
                    identifier: assessmentItem,
                    href: resources[assessmentItem].assessmentItems[0],
                  },
                },
              ],
            })),
          ],
        },
      ],
    },
    {
      outcomeProcessing: [
        {
          setOutcomeValue: [
            {
              _attr: {
                identifier: 'SCORE',
              },
            },
            {
              sum: [
                {
                  testVariables: [
                    {
                      _attr: {
                        variableIdentifier: 'SCORE',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
})

const prepareManifest = (id, title) => {
  const jsonManifest = {
    manifest: [
      {
        _attr: {
          identifier: `MANIFEST-${id}`,
          xmlns: 'http://www.imsglobal.org/xsd/imscp_v1p1',
          'xmlns:imsmd': 'http://www.imsglobal.org/xsd/imsmd_v1p2',
          'xmlns:imsqti': 'http://www.imsglobal.org/xsd/imsqti_metadata_v2p1',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:schemaLocation':
            'http://www.imsglobal.org/xsd/imscp_v1p1 http://www.imsglobal.org/xsd/imscp_v1p1.xsd http://www.imsglobal.org/xsd/imsmd_v1p2 http://www.imsglobal.org/xsd/imsmd_v1p2p4.xsd http://www.imsglobal.org/xsd/imsqti_metadata_v2p1 http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_metadata_v2p1.xsd',
        },
      },
      {
        metadata: [
          {
            schema: 'QTIv2.1 Package',
          },
          {
            schemaversion: '1.0.0',
          },
          {
            'imsmd:lom': [
              {
                'imsmd:general': [
                  {
                    'imsmd:identifier': id,
                  },
                  {
                    'imsmd:title': [
                      {
                        'imsmd:langstring': [
                          {
                            _attr: {
                              'xml:lang': 'en',
                            },
                          },
                          title,
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                'imsmd:lifecycle': [
                  {
                    'imsmd:version': [
                      {
                        'imsmd:langstring': [
                          {
                            _attr: {
                              'xml:lang': 'en',
                            },
                          },
                          '2.1',
                        ],
                      },
                    ],
                    'imsmd:status': [
                      {
                        'imsmd:source': [
                          {
                            'imsmd:langstring': [
                              {
                                _attr: {
                                  'xml:lang': 'en',
                                },
                              },
                              'LOMv1.0',
                            ],
                          },
                        ],
                        'imsmd:value': [
                          {
                            'imsmd:langstring': [
                              {
                                _attr: {
                                  'xml:lang': 'x-none',
                                },
                              },
                              'Final',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                'imsmd:metametadata': [
                  {
                    'imsmd:metadatascheme': 'LOMv1.0',
                  },
                  {
                    'imsmd:metadatascheme': 'QTIv2.1',
                  },
                  {
                    'imsmd:language': 'en',
                  },
                ],
              },
              {
                'imsmd:technical': [
                  {
                    'imsmd:format': 'text/x-imsqti-item-xml',
                  },
                  // {
                  //   'imsmd:format': 'image/jpg',
                  // },
                ],
              },
            ],
          },
        ],
      },
      // { resources: [] }
    ],
  }

  return jsonManifest
}

const createXmlFile = (
  jsonData,
  fileName,
  options = { declaration: true, indent: '  ' },
) => {
  const xmlFile = xml(jsonData, options)

  fs.writeFileSync(`${fileName}`, xmlFile, 'utf-8')
}

module.exports = {
  prepareAssessmentItem,
  prepareAssessmentTest,
  prepareManifest,
  createXmlFile,
}
