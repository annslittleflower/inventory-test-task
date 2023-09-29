/*
	TODO


	- name: Execute Unit tests
        run: |
          npm ci
          run: npm run test-prod

		clsx merge classNames here
		https://www.youtube.com/watch?v=re2JFITR7TI

		react query only one hook
		make it work, split to components after


		try native modal dialog for adding

		useReducer for all logic

		mobile styles

		leave comments if you feel its needed


		check if we can test in github action

		deploy

		react-testing-library at the end

*/

const App = () => {
  return (
    <div
      className='text-3xl font-bold underline font-red'
      data-testid='app'
    >
      hello
      <div>test</div>
    </div>
  )
}

export default App
