import MeetupList from '@/components/meetups/MeetupList';

const DUMMY_MEETUP = [
  {
    id: 'm1',
    title: 'A first meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Melburnian_Skyline.jpg/1618px-Melburnian_Skyline.jpg',
    address: 'Melbourne City',
    description: 'nice city to lives',
  },
  {
    id: 'm1',
    title: 'A first meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Sunsets_of_Brisbane%2C_Queensland%2C_September_2021%2C_01.jpg/1280px-Sunsets_of_Brisbane%2C_Queensland%2C_September_2021%2C_01.jpg',
    address: 'Brisbane City',
    description: 'nice city to lives',
  },
  {
    id: 'm1',
    title: 'A first meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/1280px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg',
    address: 'Sydney City',
    description: 'nice city to visit',
  },
];

function HomePage() {
  return (
    <div>
      <MeetupList meetups={DUMMY_MEETUP} />
    </div>
  );
}
export default HomePage;
