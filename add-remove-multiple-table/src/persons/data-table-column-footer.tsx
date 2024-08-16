import { Button } from "../components/ui/button";

export const FooterCell = ({ table }) => {
  const meta = table.options.meta;
  const selectedRows = table.getSelectedRowModel().rows;
  const removeRows = () => {
    meta.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row) => row.index)
    );
    table.resetRowSelection();
  };

  return (
    <div className="flex items-center justify-between space-x-4">
      {selectedRows.length > 0 ? (
        <Button variant="destructive" onClick={removeRows}>
          Remove Selected x
        </Button>
      ) : null}
      <Button onClick={meta?.addRow} variant="outline">
        Add New +
      </Button>
    </div>
  );
};
