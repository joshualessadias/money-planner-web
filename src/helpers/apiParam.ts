export interface FilterProps {
  name?: string;
  type?: string;
  date?: string;
  orderBy?: string;
}

interface BuildParamsProps {
  filters: FilterProps | [];
  params: {
    page: number;
    size: number;
  };
}

function buildParams({ filters, params }: BuildParamsProps) {
  const builtParams: any = { ...params };

  if (Array.isArray(filters) && filters.length > 0) {
    filters.forEach((filter: { [key: string]: string | boolean }) => {
      Object.keys(filter).forEach((key: any) => {
        if (
          filter[key] !== undefined &&
          filter[key] !== "" &&
          filter[key] !== null
        ) {
          builtParams[key] = filter[key];
        }
      });
    });
  }

  return builtParams;
}

export default buildParams;
