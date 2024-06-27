const sampleData = [
  {
    postId: 'hij',
    userFirstName: 'Jensen',
    userLastName: 'Huang',
    userHeadline: 'CEO @Nvidia | Building the future',
    postTime: '2024-05-12T02:00:00Z',
    postContent:
      'On a “suffocatingly hot, humid and sticky" day, the tech billionaire came across a man working in a garden in scorching heat. He observed that the man tended to the moss despite the heat. He used only a bamboo tweezer to sift through the foliage, which initially puzzled Huang. He said, “I walked up to him and I said, ‘What are you doing? He said, ‘I’m picking dead moss. I’m taking care of my garden.’ And I said, ‘But your garden is so big.’ And he responded, ‘I have cared for my garden for 25 years. I have plenty of time.\nThe 61-year-old CEO stated that though the interaction was brief, the gardener’s words became one of the “most profound learnings in my life.” He said, “It really taught me something. This gardener has dedicated himself to his craft and doing his life’s work. And when you do that, you have plenty of time.”',
    postImage:
      'https://onecms-res.cloudinary.com/image/upload/s--mt2NjRlk--/c_crop,h_450,w_800,x_0,y_11/c_fill,g_auto,h_468,w_830/fl_relative,g_south_east,l_mediacorp:cna:watermark:2024-04:reuters_1,w_0.1/f_auto,q_auto/v1/one-cms/core/2024-06-05t201514z_3_lynxmpek540vr_rtroptp_3_nvidia-stocks-apple.jpg?itok=2P2CoFyT',
    numLikes: 1501,
    comments: [
      {
        userFirstName: 'Michealle',
        userLastName: 'Jacobs',
        userHeadline: 'Data Engineer',
        commentContent:
          'Eye opening post! Nvidia CEO Jensen Huang is not your usual Silicon Valley tech rockstar.',
      },
    ],
  },
  {
    postId: 'abc',
    userFirstName: 'Viktoria',
    userLastName: 'Semaan',
    userHeadline: 'Developer Relations @AWS',
    postTime: '2024-05-10T02:00:00Z',
    postContent:
      'A very insightful opening day at the hashtag#clarivate Ignite event, which saw Intellectual Property professionals from around the world share their thoughts on a common platform. Special compliments to Jonathan Gear and Gordon Samson for this wonderful event.',
    postImage:
      'https://vancouver.ca/images/cov/feature/people-at-cultural-event.jpg',
    numLikes: 25,
    comments: [
      {
        userFirstName: 'Yusuf',
        userLastName: 'Rawat',
        userHeadline: 'Data Engineer',
        commentContent:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      },
    ],
  },
  {
    postId: 'def',
    userFirstName: 'Laurie',
    userLastName: 'Kirk',
    userHeadline: 'Reverse Engineer @Microsoft | C++, Assembly',
    postTime: '2024-06-10T02:00:00Z',
    postContent:
      "Pixar doesn't use GPUs(much)\n\n Their render farm compute is mostly CPUs with a ton of cores + memory, using AVX-512 and SSE 4.2 optimizations when appropriate to optimize render time.\n\nWhy?\n\nGPU render compute doesn't speed things up as much as you might expect. Yes, in certain instances, you can get a 3-4x benefit, however you have to fit all the polys in GPU memory. Paging back out to system RAM brings you back down to CPU speeds. Scenes can often contain > 150,000,000 polys. Only very recently have gpu memory sizes gotten big enough to be \"worth it\" over CPU rendering, and even then, it's often less flexible/tolerant of mixing older architectures in the cluster",
    postImage:
      'https://media.licdn.com/dms/image/D5622AQEP516oLTMWTQ/feedshare-shrink_800/0/1719339994074?e=1722470400&v=beta&t=g6O3Mqe2hGsJ9rQxRsqVJYOkMcq3GR0ls6p5Yscp4Ps',
    numLikes: 15,
    comments: [
      {
        userFirstName: 'Raúl',
        userLastName: 'Álvarez',
        userHeadline: 'Sustainable and efficient Data Centers',
        commentContent:
          'Hey Laurie, could you please provide some reference material or links to back this discussion?',
      },
      {
        userFirstName: 'Naveen',
        userLastName: 'Nathan',
        userHeadline: 'Sustainable and efficient Data Centers',
        commentContent:
          'Cool tidbit of information! I remember working for CIS Hollywood a defunct compositing and VFX shop, they used primarily compute nodes for rendering. This was like 2004 though.',
      },
    ],
  },
  {
    postId: 'efg',
    userFirstName: 'Ben',
    userLastName: 'Fitzgerald',
    userHeadline: 'Harware @Apple | Vision Pro',
    postTime: '2024-06-15T02:00:00Z',
    postContent:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    postImage:
      'https://www.apple.com/newsroom/images/media/introducing-apple-vision-pro/Apple-WWDC23-Vision-Pro-glass-230605_big.jpg.large.jpg',
    numLikes: 101,
    comments: [
      {
        userFirstName: 'Rachel',
        userLastName: 'Williams',
        userHeadline: 'Aspiring Engineer',
        commentContent: 'Great share! Love this!',
      },
      {
        userFirstName: 'Emily',
        userLastName: 'Walker',
        userHeadline: 'Product @PayPal',
        commentContent: 'This is soooo cool!',
      },
    ],
  },
];

export default sampleData;
