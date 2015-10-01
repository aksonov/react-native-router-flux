jest.dontMock('../store');
jest.dontMock('../actions');
var actions = require('../actions');
var alt = require('../alt');
var PageStore = require('../store');

describe('PageStore', function() {
    it('init action', function() {
        var state = PageStore.getState();
        expect(state.routes.length).toBe(0);
        expect(state.currentRoute).toBe(null);

        actions.init("launch");
        state = PageStore.getState();
        expect(state.routes.length).toBe(1);
        expect(state.routes[0]).toBe("launch");
        expect(state.currentRoute).toBe("launch");

        actions.init("home");
        state = PageStore.getState();
        expect(state.routes.length).toBe(1);
        expect(state.routes[0]).toBe("home");
        expect(state.currentRoute).toBe("home");
    });

    it('push action', function() {
        actions.init("init");

        var state = PageStore.getState();
        expect(state.routes.length).toBe(1);
        expect(state.currentRoute).toBe("init");

        actions.push({name: "launch", data: "test"});
        state = PageStore.getState();
        expect(state.routes.length).toBe(2);
        expect(state.routes[1]).toBe("launch");
        expect(state.currentRoute).toBe("launch");
        expect(state.mode).toBe("push");
        expect(state.data).toBe("test");

        actions.push({name: "home", data: "homeData"});
        state = PageStore.getState();
        expect(state.routes.length).toBe(3);
        expect(state.routes[2]).toBe("home");
        expect(state.mode).toBe("push");
        expect(state.data).toBe("homeData");
        expect(state.currentRoute).toBe("home");
    });

    it('pop action', function() {
        actions.push({name: "launch", data: "test"});
        actions.push({name: "home"});
        actions.push({name: "home2"});
        actions.push({name: "home3"});
        actions.push({name: "home4"});
        var state = PageStore.getState();
        expect(state.currentRoute).toBe("home4");
        actions.pop();
        state = PageStore.getState();
        expect(state.currentRoute).toBe("home3");
        expect(state.mode).toBe("pop");
        expect(state.num).toBe(1);

        actions.pop(2);
        state = PageStore.getState();
        expect(state.currentRoute).toBe("home");
        expect(state.mode).toBe("pop");
        expect(state.num).toBe(2);

        expect(state.customData).toBe(undefined);
        actions.pop({customData: 'customData'});
        state = PageStore.getState();
        expect(state.currentRoute).toBe("launch");
        expect(state.customData).toBe("customData");
    });

});