export function numberWithCommas(x) {


  if (x !== null) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return 0
  }
  }



