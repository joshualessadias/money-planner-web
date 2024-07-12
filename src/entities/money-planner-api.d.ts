/* tslint:disable */
/* eslint-disable */

// Generated using typescript-generator version 3.2.1263 on 2024-07-11 23:55:48.

export interface AppUserFilterRequestDTO extends BaseFilter {
  name: string;
  email: string;
}

export interface AuthenticationRequestDTO
  extends AppUserRequestValidationConstants {
  email: string;
  password: string;
}

export interface RegisterRequestDTO extends AppUserRequestValidationConstants {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface BankFilterRequestDTO extends BaseFilter {
  name: string;
  code: string;
}

export interface BankRequestDTO {
  name: string;
  code: string;
}

export interface OutcomeFilterRequestDTO extends BaseFilter {
  categoryId: number;
  paymentMethodId: number;
  bankId: number;
  initialDate: Date;
  finalDate: Date;
  initialValue: number;
  finalValue: number;
  description: string;
  findAll: boolean;
  hideInstallments: boolean;
}

export interface OutcomeRequestDTO {
  description: string;
  value: number;
  date: number;
  categoryId: number;
  paymentMethodId: number;
  bankId: number;
  installments: number;
}

export interface OutcomeCategoryFilterRequestDTO extends BaseFilter {
  name: string;
  description: string;
}

export interface OutcomeCategoryRequestDTO {
  name: string;
  description: string;
}

export interface PaymentMethodFilterRequestDTO extends BaseFilter {
  name: string;
  description: string;
  code: string;
}

export interface PaymentMethodRequestDTO {
  name: string;
  description: string;
  code: string;
}

export interface AppUserResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

export interface AuthenticationResponseDTO {
  token: string;
}

export interface BankResponseDTO {
  id: number;
  name: string;
  code: string;
}

export interface OutcomeCategoryResponseDTO {
  id: number;
  name: string;
  description: string;
}

export interface OutcomeResponseDTO {
  id: number;
  description: string;
  value: number;
  date: number;
  category: OutcomeCategoryResponseDTO;
  paymentMethod: PaymentMethodResponseDTO;
  bank: BankResponseDTO;
  childrenInstallmentsAmount: number;
}

export interface PaymentMethodResponseDTO {
  id: number;
  name: string;
  description: string;
  code: string;
}

export interface RoleResponseDTO {
  id: number;
  name: string;
}

export interface OutcomeKpiByCategoryResponseDTO {
  value: number;
  category: OutcomeCategoryResponseDTO;
}

export interface OutcomeKpiResponseDTO {
  totalValue: number;
  kpiByCategoryList: OutcomeKpiByCategoryResponseDTO[];
}

export interface Page<T> extends Slice<T> {
  totalElements: number;
  totalPages: number;
}

export interface BaseFilter {
  page: number;
  size: number;
  orderBy: string;
}

export interface AppUserRequestValidationConstants {}

export interface Sort extends Streamable<Order> {
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Slice<T> extends Streamable<T> {
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  pageable: Pageable;
}

export interface Streamable<T> extends Iterable<T>, Supplier<Stream<T>> {
  empty: boolean;
}

export interface Order {
  direction: Direction;
  property: string;
  ignoreCase: boolean;
  nullHandling: NullHandling;
  ascending: boolean;
  descending: boolean;
}

export interface Iterable<T> {}

export interface Supplier<T> {}

export interface Stream<T> extends BaseStream<T, Stream<T>> {}

export interface BaseStream<T, S> extends AutoCloseable {
  parallel: boolean;
}

export interface AutoCloseable {}

export type Direction = "ASC" | "DESC";

export type NullHandling = "NATIVE" | "NULLS_FIRST" | "NULLS_LAST";
