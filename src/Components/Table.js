export default function Table(props) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody id="table-body">{props.tasks()}</tbody>
      </table>
    </div>
  );
}
