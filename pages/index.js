import Router from 'next/router';
import { v4 as uuidv4 } from 'uuid';

const Home = () => null;

Home.getInitialProps = ({ res }) => {
	if (res) {
		res.writeHead(307, { Location: `/${uuidv4()}` });
		res.end();
	} else {
		Router.replace(`/${uuidv4()}`);
	}

	return {};
};

export default Home;
