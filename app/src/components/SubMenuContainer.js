import React from 'react'
import { ChevronRightRounded } from "@mui/icons-material"

function SubMenuContainer() {
  return (
    <div className="subMenuContianer">
        <h3>Categorias</h3>
        <div className="viewAll">
        <p>View All</p>
        <i>
          <ChevronRightRounded />
        </i>
      </div>
    </div>
  )
}

export default SubMenuContainer