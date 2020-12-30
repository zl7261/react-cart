import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

global.matchMedia = global.matchMedia || function () {
    return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn()
    }
}