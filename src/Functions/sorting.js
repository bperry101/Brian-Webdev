const sorting = (element) => {
    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
    const initData = element.map((item, i) => {
      return {size: item.size, sym: item.sym, color:colors[i]}
    }
    )
    
    const data = initData.sort(function(a, b) {
      return b.size - a.size;
  })

  return data;
}

export default sorting;