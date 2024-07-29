import {
  Button,
  Collapse,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import NumericFormatCustom from "@/components/NumericFormatCustom";
import React, { useEffect, useState } from "react";
import { OutcomeCategoryResponseDTO } from "@/entities/money-planner-api";
import { TransitionGroup } from "react-transition-group";
import DeleteIcon from "@mui/icons-material/Delete";

interface CollapsibleOutcomeCategoryListProps {
  outcomeCategoryList: OutcomeCategoryResponseDTO[];
  disabled?: boolean;
}

interface OutcomeCategoryItem {
  outcomeCategoryId?: number;
  value?: number;
}

interface RenderItemProps {
  item: OutcomeCategoryItem;
  handleRemoveItem: (itemId: number) => void;
  onChange: (item: OutcomeCategoryItem) => void;
}

export default function CollapsibleOutcomeCategoryList({
  outcomeCategoryList,
  disabled,
}: CollapsibleOutcomeCategoryListProps) {
  const [addedOutcomeCategoryList, setAddedOutcomeCategoryList] = useState<
    OutcomeCategoryItem[]
  >([{ outcomeCategoryId: undefined, value: undefined }]);

  useEffect(() => {
    console.log(addedOutcomeCategoryList);
  }, []);

  function handleAddItem() {
    if (
      addedOutcomeCategoryList.some((obj) =>
        Object.values(obj).every((value) => value == undefined)
      )
    )
      return;
    const newItem = {
      outcomeCategoryId: undefined,
      value: undefined,
    };
    setAddedOutcomeCategoryList((prev) => [...prev, newItem]);
  }

  function handleRemoveItem(outcomeCategoryId: number) {
    setAddedOutcomeCategoryList((prev) => [
      ...prev.filter((i) => i.outcomeCategoryId !== outcomeCategoryId),
    ]);
  }

  function isOutcomeCategoryAlreadySelected(item: OutcomeCategoryItem) {
    return addedOutcomeCategoryList
      .filter((i) => i !== item)
      .map((adddedCategory) => adddedCategory.outcomeCategoryId)
      .includes(item.outcomeCategoryId);
  }

  function handleChangeItem(item: OutcomeCategoryItem, index: number) {
    if (isOutcomeCategoryAlreadySelected(item)) return;

    setAddedOutcomeCategoryList((prev) => {
      const aux = [...prev];
      aux[index] = item;
      return aux;
    });
  }

  function renderItem({ item, handleRemoveItem, onChange }: RenderItemProps) {
    return (
      <Grid container spacing={1} marginBottom={1}>
        <Grid item xs={6} md={7}>
          <TextField
            disabled={disabled}
            id="outcomeCategory"
            select
            required
            label="Categoria"
            size="small"
            fullWidth
            value={item.outcomeCategoryId ?? ""}
            onChange={(e) => {
              item.outcomeCategoryId = Number(e.target.value);
              onChange(item);
            }}
          >
            {outcomeCategoryList.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={5} md={4}>
          <TextField
            disabled={disabled}
            id="value"
            required
            label="Valor"
            size="small"
            fullWidth
            value={item.value}
            onChange={(e) => {
              item.value = Number(e.target.value);
              onChange(item);
            }}
            InputProps={{ inputComponent: NumericFormatCustom }}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton disabled={disabled || !item.outcomeCategoryId}>
            <DeleteIcon
              color={item.outcomeCategoryId ? "error" : "info"}
              onClick={() =>
                item.outcomeCategoryId &&
                handleRemoveItem(item.outcomeCategoryId)
              }
            />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <TransitionGroup>
        {addedOutcomeCategoryList.map((item, index) => (
          <Collapse key={index}>
            {renderItem({
              item,
              handleRemoveItem,
              onChange: (item) => handleChangeItem(item, index),
            })}
          </Collapse>
        ))}
      </TransitionGroup>
      <Button color="info" onClick={handleAddItem}>
        + Adicionar
      </Button>
    </>
  );
}
