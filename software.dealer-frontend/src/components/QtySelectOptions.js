export default function QtySelectOptions(props) {
  const rows = [];
  for (let i = 1; i <= props.quantity; i++) {
    rows.push(<option value={i}>{i}</option>);
  }

  return rows;
}
