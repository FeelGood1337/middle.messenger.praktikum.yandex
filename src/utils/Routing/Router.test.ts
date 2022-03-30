import { expect } from 'chai';
import router from '../../router';
import { Block } from '../Block/Block';

describe('Router', () => {
	class MainPage extends Block {}
	class AboutPage extends Block {}
	class BlogPage extends Block {}
  
	let callbackCounter: number = 0;
  
	router
	  .use('/', MainPage)
	  .use('/about', AboutPage)
	  .use('/blog', BlogPage)
	  .start();
  
	it('Change route', () => {
	  router.go('/');
	  router.go('/about');
	  expect(router.history.length).to.eq(3);
	});
  
	it('Get pathname', () => {
	  router.go('/blog');
	  const { pathname }: any = router._currentRoute || {};
	  expect(pathname).to.eq('/blog');
	});
  
	it('Call onRoute', () => {
	  expect(callbackCounter).to.eq(3);
	});
  });