import {expect} from 'chai';
import {ListWrapper,StringMapWrapper} from '../../src/facade/collections';

describe( `facade/collections`, ()=> {

  describe( `StringMapWrapper`, ()=> {

    describe( `ES6/7 Object ponyfills`, ()=> {

      const obj = { foo: 1231, hello: 'yq', moo:{wat:'not'} } as {[key: string]: any};
      const actual = StringMapWrapper.values( obj );
      const expected = [ 1231, 'yq', { wat: 'not' } ];

      expect( actual ).to.deep.equal( expected );

    } );

    describe( `#baseGet`, ()=> {

      it( `should get value from object array path`, ()=> {

        const obj = { one: { two: {three: 3}}};
        const path = ['one','two','three'];
        const actual = StringMapWrapper.baseGet(obj,path);
        const expected = 3;

        expect(actual).to.equal(expected);

      } );

      it( `should get undefined from object array path if not found`, ()=> {

        const obj = { one: { two: {three: 3}}};
        const path = ['one','two','four'];
        const actual = StringMapWrapper.baseGet(obj,path);
        const expected = undefined;

        expect(actual).to.equal(expected);

      } );

    } );

    describe( `#getValueFromPath`, ()=> {

      it( `should get value from object string path`, ()=> {

        const obj = { one: { two: {three: 3}}};
        const path = 'one.two.three';
        const actual = StringMapWrapper.getValueFromPath(obj,path);
        const expected = 3;

        expect(actual).to.equal(expected);

      } );

      it( `should get default value if set or undefined if path didn't found a value`, ()=> {

        const obj = { one: { two: {three: 3}}};
        const path = 'one.two.three.four';
        let actual = StringMapWrapper.getValueFromPath(obj,path);
        let expected = undefined;

        expect(actual).to.equal(expected);

        actual = StringMapWrapper.getValueFromPath(obj,path,111);
        expected = 111;
        expect(actual).to.equal(expected);

      } );

      it( `should find path also if array indexes are used`, ()=> {

        const obj = { one: { two: [ { three: 3 } ] } };
        const path = 'one.two[0].three';
        const actual = StringMapWrapper.getValueFromPath(obj,path);
        const expected = 3;

        console.log( actual );

        expect(actual).to.equal(expected);

      } );

    } );

  } );

  describe( `ListWrapper`, ()=> {

    describe( `ES6 Array ponyfills`, ()=> {

      it( `should find array item or undefined if not found`, ()=> {

        let arr: any[] = [ 1, 2, 3, 4, 5 ];
        let found = ListWrapper.find( arr, ( el )=> el === 2 );
        expect( found ).equal( 2 );

        arr = [ { name: 'adam' }, { name: 'eve' }, { name: 'john' } ];
        found = ListWrapper.find( arr, ( el )=>el.name === 'eve' );
        expect( found ).to.deep.equal( { name: 'eve' } );

      } );
      it( `should find array item position or -1 if not found`, ()=> {

        const arr = [ 10, 20, 30, 40 ];

        expect( ListWrapper.findIndex( arr, ( x )=>x === 30 ) ).to.equal( 2 );
        expect( ListWrapper.findIndex( arr, ( x )=>x === 'noop' ) ).to.equal( -1 );

      } );

    } );

  } );

} );
