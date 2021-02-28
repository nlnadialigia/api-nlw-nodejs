export const swaggerDocument =
{
  swagger: '2.0',
  info: {
    description: 'O projeto consiste em uma API de NPS (Net Promoter Score), com sistema de cadastramento de usuários, cadastramento de pesquisas de satisfação, envio de pesquisa por email e cálculo do NPS',
    version: '1.0.0',
    title: 'API REST para NPS',
    contact: {
      email: 'nlnadialigia@gmail.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  host: 'localhost:3090',
  tags: [
    {
      name: 'user',
      description: 'User registration'
    },
    {
      name: 'survey',
      description: 'Survey registration'
    },
    {
      name: 'sendMail',
      description: 'Send mail with survey to user'
    },
    {
      name: 'nps',
      description: 'Calculation of the NPS of the surveys recevied'
    }
  ],
  schemes: [
    'http'
  ],
  paths: {
    '/users': {
      post: {
        tags: [
          'user'
        ],
        summary: 'Create a  new user',
        consumes: [
          'application/json'
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'User object',
            required: true,
            schema: {
              $ref: '#/definitions/User'
            }
          }
        ],
        responses: {
          200: {
            description: 'User created'
          },
          400: {
            description: 'Error ocurred'
          }
        }
      }
    },
    '/surveys': {
      get: {
        tags: [
          'survey'
        ],
        summary: 'Get all surveys',
        produces: [
          'application/json'
        ],
        responses: {
          200: {
            description: 'Sucessful operation',
            schema: {
              $ref: '#/definitions/Surveys'
            }
          },
          400: {
            description: 'Error ocurred'
          }
        }
      },
      post: {
        tags: [
          'survey'
        ],
        summary: 'Create a  new survey',
        consumes: [
          'application/json'
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'User object',
            required: true,
            schema: {
              $ref: '#/definitions/Surveys'
            }
          }
        ],
        responses: {
          201: {
            description: 'Survey created'
          },
          400: {
            description: 'Error ocurred'
          }
        }
      }
    },
    '/sendMail': {
      post: {
        tags: [
          'sendMail'
        ],
        summary: 'Send mail with surveys to user',
        consumes: [
          'application/json'
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'SendMail object',
            required: true,
            schema: {
              $ref: '#/definitions/SendMail'
            }
          }
        ],
        responses: {
          200: {
            description: 'Email sucessful sent'
          },
          400: {
            description: 'Error ocurred'
          }
        }
      }
    },
    '/nps/{survey_id}': {
      get: {
        tags: [
          'nps'
        ],
        summary: 'Calculation of the NPS of the surveys recevied',
        produces: [
          'application/json'
        ],
        parameters: [
          {
            in: 'path',
            name: 'survey_id',
            type: 'string',
            required: true
          }
        ],
        responses: {
          200: {
            description: 'Sucessful operation',
            schema: {
              $ref: '#/definitions/Nps'
            }
          },
          400: {
            description: 'Error ocurred'
          }
        }
      }
    }
  },
  definitions: {
    User: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Anabele Rochele'
        },
        email: {
          type: 'string',
          example: 'email99@email.com.br'
        }
      }
    },
    Surveys: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        },
        title: {
          type: 'string',
          example: 'Queremos saber sua opinião'
        },
        description: {
          type: 'string',
          example: 'Como você classifica o conteúdo da NLW4'
        },
        created_at: {
          type: 'string',
          format: 'date'
        }
      }
    },
    SendMail: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'email99@email.com.br'
        },
        survey_id: {
          type: 'string',
          format: 'uuid',
          example: 'f624b209-0631-4d84-9078-002195182a17'
        }
      }
    },
    Nps: {
      type: 'object',
      properties: {
        detractors: {
          type: 'number'
        },
        promoters: {
          type: 'number'
        },
        passives: {
          type: 'number'
        },
        totalAnswers: {
          type: 'number'
        },
        nps: {
          type: 'number',
          format: 'double'
        }
      }
    }
  }
};
