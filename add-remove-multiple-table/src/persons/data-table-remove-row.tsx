import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export const RemoveRowCell = ({ row, table }) => {
  return (
    <div className="flex items-center space-x-2 mr-5">
      <Button
        onClick={() => table.options.meta?.removeRow(row.index)}
        variant="destructive"
      >
        Remove
      </Button>
      <Input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="w-4 h-4"
      />
    </div>
  );
};
