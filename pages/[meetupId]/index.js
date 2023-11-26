// single meetup item content.
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '@/components/meetups/MeetupDetail';
import Head from 'next/head';

function MeetupDetailsPage(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

// getStaticPaths - function that need to export in a page component file if it is dynamic page & when using getStaticProps.
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://Viacheslav:MongoKopa@cluster0.xkwrg0d.mongodb.net/meetups-project?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups collection');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // fetch document objects but they each will only contain the ID, nothing else.
  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    // [
    //   {
    //     params: {
    //       meetupId: 'm1',
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2',
    //     },
    //   },
    // ],
  };
}

// ! getStaticProps - do not support (req, res), contein params instead.
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  const client = await MongoClient.connect(
    'mongodb+srv://Viacheslav:MongoKopa@cluster0.xkwrg0d.mongodb.net/meetups-project?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups collection');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  console.log(selectedMeetup);

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetailsPage;
