
function doubleAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x * 2);
      }, 2000);
    });
  }
  
  async function addAsync(x) {
    const a = await doubleAfter2Seconds(x*1);
    const b = await doubleAfter2Seconds(x*2);
    const c = await doubleAfter2Seconds(x*3);
    return x + a + b + c;
  }
  
  
  addAsync(10).then((sum) => {
    console.log(sum);
  });