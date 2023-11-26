import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '@/components/meetups/MeetupList';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
      <meta name='description' content='Browse a huge of hight active React meetups!'/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// getServerSideProps- will not run during build process but instead always on the server after deployment.
// export async function getServerSideProps(context) {
//   const requestObject = context.req;
//   const responseObject = context.res;

//   // fetch data here
//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://Viacheslav:MongoKopa@cluster0.xkwrg0d.mongodb.net/meetups-project?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups collection');
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 5, // - seconds the time when page would be regenerated on the server at least evry 5 sec if there are request coming in for this page
  };
}

export default HomePage;
