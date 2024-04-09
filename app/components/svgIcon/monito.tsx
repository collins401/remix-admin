import React from 'react'

export default function Monitor(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M274.773333 53.333333h474.026667c90.325333 0 140.8 13.696 174.506667 47.274667s47.36 84.053333 47.36 174.165333v270.08c0 90.282667-13.696 140.8-47.317334 174.336-41.472 41.386667-108.202667 46.933333-174.122666 46.933334H272.256c-89.045333 0-138.922667-13.781333-172.245333-47.530667S53.333333 634.922667 53.333333 545.28V274.773333c0-90.112 13.696-140.544 47.274667-174.165333S184.661333 53.333333 274.773333 53.333333z m474.453334 648.96c70.4 0 108.970667-8.533333 128.896-28.416s28.544-58.538667 28.544-129.024V274.773333c0-70.314667-8.533333-108.885333-28.586667-128.853333s-58.88-28.586667-129.28-28.586667H274.773333c-70.314667 0-108.885333 8.533333-128.896 28.544S117.333333 204.458667 117.333333 274.773333v270.506667c0 70.058667 8.533333 108.458667 28.202667 128.512s57.6 28.501333 126.72 28.501333H749.226667zM512 970.666667a32 32 0 0 1-32-32v-203.946667a32 32 0 0 1 32-32 32 32 0 0 1 32 32V938.666667a32 32 0 0 1-32 32zM938.666667 586.666667H85.333333a32 32 0 0 1-32-32 32 32 0 0 1 32-32h853.333334a32 32 0 0 1 32 32 32 32 0 0 1-32 32zM704 970.666667h-384a32 32 0 0 1-32-32 32 32 0 0 1 32-32h384a32 32 0 0 1 32 32 32 32 0 0 1-32 32z"
      />
    </svg>
  )
}
