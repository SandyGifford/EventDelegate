import "jest";
import EventDelegate from "../EventDelegate";

describe("Transformer", () => {
	test("addEventListener/trigger", () => {
		const delegate = new EventDelegate<string>();

		const callback = jest.fn();

		function listener(data: string) {
			expect(data).toEqual("hello world");
		}

		delegate.addEventListener(callback);
		delegate.addEventListener(listener);

		delegate.trigger("hello world");
		delegate.trigger("hello world");

		expect(callback).toHaveBeenCalledTimes(2);
	});

	test("removeEventListener/trigger", () => {
		const delegate = new EventDelegate<string>();

		const callback = jest.fn();

		delegate.addEventListener(callback);

		delegate.trigger("hello");
		delegate.trigger("world");

		delegate.removeEventListener(callback);

		delegate.trigger("foo");
		delegate.trigger("bar");

		expect(callback).toHaveBeenCalledTimes(2);
	});

	describe("getListenerCount", () => {
		it("should be able to count with listeners", () => {
			const delegate = new EventDelegate<string>();

			delegate.addEventListener(() => { });
			delegate.addEventListener(() => { });
			delegate.addEventListener(() => { });
			delegate.addEventListener(() => { });

			expect(delegate.getListenerCount()).toBe(4);
		});

		it("should be able to count with no listeners", () => {
			const delegate = new EventDelegate<string>();

			expect(delegate.getListenerCount()).toBe(0);
		});

		it("should be able to count when listeners have been removed", () => {
			const delegate = new EventDelegate<string>();

			const listener1 = () => { };
			const listener2 = () => { };
			const listener3 = () => { };
			const listener4 = () => { };

			delegate.addEventListener(listener1);
			delegate.addEventListener(listener2);
			delegate.addEventListener(listener3);
			delegate.addEventListener(listener4);

			expect(delegate.getListenerCount()).toBe(4);

			delegate.removeEventListener(listener1);
			delegate.removeEventListener(listener2);

			expect(delegate.getListenerCount()).toBe(2);
		});
	});

	describe("hasListeners", () => {
		it("should return true when there are listeners", () => {
			const delegate = new EventDelegate<string>();

			delegate.addEventListener(() => { });
			delegate.addEventListener(() => { });
			delegate.addEventListener(() => { });
			delegate.addEventListener(() => { });

			expect(delegate.hasListeners()).toBe(true);
		});

		it("should return false when there are no listeners", () => {
			const delegate = new EventDelegate<string>();

			expect(delegate.hasListeners()).toBe(false);
		});

		it("should return true when some listeners have been removed", () => {
			const delegate = new EventDelegate<string>();

			const listener1 = () => { };
			const listener2 = () => { };
			const listener3 = () => { };
			const listener4 = () => { };

			delegate.addEventListener(listener1);
			delegate.addEventListener(listener2);
			delegate.addEventListener(listener3);
			delegate.addEventListener(listener4);

			expect(delegate.getListenerCount()).toBe(4);

			delegate.removeEventListener(listener1);
			delegate.removeEventListener(listener2);

			expect(delegate.hasListeners()).toBe(true);
		});

		it("should return false when all listeners have been removed", () => {
			const delegate = new EventDelegate<string>();

			const listener1 = () => { };
			const listener2 = () => { };
			const listener3 = () => { };
			const listener4 = () => { };

			delegate.addEventListener(listener1);
			delegate.addEventListener(listener2);
			delegate.addEventListener(listener3);
			delegate.addEventListener(listener4);

			expect(delegate.getListenerCount()).toBe(4);

			delegate.removeEventListener(listener1);
			delegate.removeEventListener(listener2);
			delegate.removeEventListener(listener3);
			delegate.removeEventListener(listener4);

			expect(delegate.hasListeners()).toBe(false);
		});
	});
});
