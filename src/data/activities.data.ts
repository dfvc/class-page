import { subjects } from '@/data/subjects.data';
import { IActivity } from '@/types/activity.type';

const subjectsMap: any = [];
subjects.forEach((s) => { subjectsMap[s.shortName.toLowerCase()] = s; });

export const activities: IActivity[] = [
  {
    subject: subjectsMap.et,
    description: 'Construção de um marcador de livros.',
    attachments: [
      {
        url: '#',
        text: 'Enunciado',
        type: 'doc',
      },
    ],
    deliveryDate: '23-03-2020',
    deliveryMethod: 'Enviar fotografia do marcador para elisabeteisabel@aevrsa.com',
    dateCreation: '19-03-2020',
    dateChanged: '',
  },
  {
    subject: subjectsMap.ev,
    description: 'Efetuar resumo do artigo disponível no website da Fundação Calouste Gulbenkian (link abaixo) sobre a artista Maria Antónia Siza. Devem também realizar um autorretrato com base nos desenhos da referida artista.',
    attachments: [
      {
        url: '#',
        text: 'Enunciado',
        type: 'doc',
      },
      {
        url: 'https://gulbenkian.pt/',
        text: 'Fundação Calouste Gulbenkian',
        type: 'url',
      },
    ],
    deliveryDate: '23-03-2020',
    deliveryMethod: 'Enviar fotografia para elisabeteisabel@aevrsa.com',
    dateCreation: '19-03-2020',
    dateChanged: '',
  },
  {
    subject: subjectsMap.ing,
    description: 'Aceder ao site da Leya (link abaixo), inscrever-se na sala do 5º ano com o código "qfszs" e realizar os testes disponíveis.',
    attachments: [
      {
        url: 'https://auladigital.leya.com/',
        text: 'Leya',
        type: 'url',
      },
    ],
    deliveryDate: '23-03-2020',
    dateCreation: '19-03-2020',
    dateChanged: '',
  },
  {
    subject: subjectsMap.mat,
    description: 'Realizar a ficha de trabalho das páginas 16, 17, 22 e 23 do manual - parte 2.',
    deliveryMethod: 'Início das aulas.',
    dateCreation: '19-03-2020',
    dateChanged: '',
  },
  {
    subject: subjectsMap.cn,
    description: 'Realizar o relatório da atividade efetuada em sala de aula.',
    attachments: [
      {
        url: '#',
        text: 'Relatório',
        type: 'doc',
      },
    ],
    deliveryDate: '23-03-2020',
    deliveryMethod: 'Enviar fotografia para cristinabarbosa@aevrsa.com',
    dateCreation: '19-03-2020',
    dateChanged: '',
  },
  {
    subject: subjectsMap.ef,
    description: 'Consulta ao site oficial da plataforma FiTescola (leitura e familiarização sobre a ferramenta de trabalho).',
    attachments: [
      {
        url: '#',
        text: 'Enunciado',
        type: 'doc',
      },
      {
        url: 'https://fitescola.dge.mec.pt',
        text: 'FiTescola',
        type: 'url',
      },
    ],
    dateCreation: '19-03-2020',
    dateChanged: '',
  },
  {
    subject: subjectsMap.hgp,
    description: 'Responder às perguntas das páginas 92 e 93 e a ficha n.º 8 do caderno de atividades.',
    deliveryMethod: 'Início das aulas.',
    dateCreation: '13-03-2020',
    dateChanged: '',
  },
  {
    subject: subjectsMap.hgp,
    description: 'Enviar fotografia do astrolábio pedido anteriormente.',
    deliveryDate: '27-03-2020',
    deliveryMethod: 'Enviar fotografia para <a href="mailto: filomenaandrade@aevrsa.com">filomenaandrade@aevrsa.com</a>',
    dateCreation: '23-03-2020',
    dateChanged: '',
  },
  {
    subject: subjectsMap.por,
    description: 'Realizar uma ficha de leitura com base na leitura autónoma de um livro.',
    attachments: [
      {
        url: '#',
        text: 'Ficha de Leitura',
        type: 'doc',
      },
    ],
    deliveryMethod: 'Início das aulas.',
    dateCreation: '23-03-2020',
    dateChanged: '',
  },
  {
    subject: subjectsMap.ef,
    description: 'Continuação da tarefa da semana anterior, concretamente da consulta ao site oficial da plataforma FiTescola (leitura e familiarização sobre a ferramenta de trabalho).',
    attachments: [
      {
        url: '#',
        text: 'Enunciado',
        type: 'doc',
      },
      {
        url: 'https://fitescola.dge.mec.pt',
        text: 'FiTescola',
        type: 'url',
      },
    ],
    dateCreation: '24-03-2020',
    dateChanged: '',
  },
  {
    subject: subjectsMap.tic,
    description: 'Efetuar a autoavaliação.',
    attachments: [
      {
        url: 'https://forms.gle/CJZtQMc9WCVn7JpAA',
        text: 'Ficha de Autoavaliação',
        type: 'url',
      },
    ],
    deliveryDate: '27-03-2020',
    dateCreation: '24-03-2020',
    dateChanged: '',
  },
  {
    subject: subjectsMap.cd,
    description: 'Efetuar a autoavaliação.',
    attachments: [
      {
        url: 'https://forms.gle/UX491RSA6JWyqk6D7',
        text: 'Ficha de Autoavaliação',
        type: 'url',
      },
    ],
    deliveryDate: '27-03-2020',
    dateCreation: '24-03-2020',
    dateChanged: '',
  },
  {
    subject: subjectsMap.em,
    description: 'Efetuar a correção do teste de avaliação, com exeção da parte auditiva.',
    attachments: [
      {
        url: '#',
        text: 'Teste de Avaliação',
        type: 'doc',
      },
    ],
    deliveryMethod: '1ª sexta-feira de aulas',
    dateCreation: '25-03-2020',
    dateChanged: '',
  },
];
