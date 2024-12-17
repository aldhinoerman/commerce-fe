interface LoginFormInput {
  id?: number;
  email: string;
  password: string;
}

interface INav {
  label: string;
  link: string;
}

interface ICategory {
  id: number;
  name: string;
  image: string;
}

interface IVariant {
  id?: number;
  name?: string;
  description?: string
  price?: number
  stock?: number
  sku?: string
  image?: string
}

interface IProduct {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  variants: IVariant[];
}

interface IRequest<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type { LoginFormInput, INav, IRequest, ICategory, IProduct };
