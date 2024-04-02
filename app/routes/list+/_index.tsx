import { Link } from '@remix-run/react'

export default function List() {
  return (
    <div>
      <h1>List</h1>
      <Link to="/list/detail">to detail</Link>
      <div className="bg-white p-10">12</div>
    </div>
  )
}
