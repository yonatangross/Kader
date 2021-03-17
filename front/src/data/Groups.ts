import { GroupPrivacy } from '../types/GroupPrivacy';

export default [
  {
    id: '1',
    name: 'Senior devs',
    category: 'Sports',
    description: 'searching for a football 30cm.\n brand new please!',
    mainLocation: 'Ashkelon',
    searchable: true,
    groupPrivacy: GroupPrivacy.PUBLIC,
    members: [
      {
        id: '1',
        firstName: 'yoni',
        lastName: 'bolila',
        email: 'yonatan2gross@gmailk.com',
        phoneNumber: '0506656474',
        rating: 5,
        numberOfRatings: 25,
        groups: [],
        posts: [],
        comments: [],
        imageUri: 'https://images1.ynet.co.il/PicServer2/03072003/353264/nurit_wh.jpg',
      },
    ],
    posts: [
      {
        id: '1',
        type: 'Request',
        category: 'Sports',
        title: 'Looking for a football',
        description: 'searching for a football 30cm.\n brand new please!',
        comments: [
          { id: '1', content: 'I have a basketball' },
          { id: '2', content: 'I have what you looking for ;-)' },
        ],
        location: 'Ashkelon',
        images: ['https://images1.ynet.co.il/PicServer2/03072003/353264/nurit_wh.jpg', 'https://images1.ynet.co.il/PicServer2/03072003/353264/nurit_wh.jpg'],
        creator: [
          {
            id: '1',
            firstName: 'yoni',
            lastName: 'bolila',
            email: 'yonatan2gross@gmailk.com',
            phoneNumber: '0506656474',
            rating: 5,
            numberOfRatings: 25,
            groups: [],
            posts: [],
            comments: [],
            imageUri: 'https://images1.ynet.co.il/PicServer2/03072003/353264/nurit_wh.jpg',
          },
        ],
      },
    ],
  },
];
