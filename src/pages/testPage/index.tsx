import React from 'react';

class Tes extends Object {
  constructor(props: any) {
    super(props);

    const newThis = new Proxy(this, {
      set(target: any, key: any, value: any) {
        console.log('0------------', key, value);
        target[key] = value;
        return true;
      }
    })

    // Object.assign(newThis, props);
    this.init(props);
    return newThis;
  }

  init(props: any) {
    console.log('---------base');
    console.log(this);
    Object.assign(this, props);
    console.log(this);
  }

  myName() {
    console.log('myName');
    console.log(this);
  }
}

class Tes2 extends Tes {
  v1: any;
  v2: any = 1;
  constructor(props: any) {
    super(props);

    // this.init(props);
    console.log('----t2')
    console.log(this);
  }
}

const App: React.FC = () => {
  const t2 = new Tes2({
    v1: 'wwj',
    v2: 'hxy'
  })

  t2.myName();

  // console.log(t2);

  // const t = new Tes({wwj: 'hxy'});
  // t.myName();



  // const t2 = new Proxy(t, {
  //   set(target: any, key: string, value: any) {
  //     console.log(target, key, value);
  //     target[key] = value;
  //     return true;
  //   }
  // })
  
  // t2.wwj = 'ai';
  // Object.assign(t2, {wwj: 'ia'});
  // console.log(t2);

  return (
    <div>
      test
    </div>
  );
}

export default App;