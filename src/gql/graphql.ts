import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateCryptoInput = {
  /** ティッカーシンボル */
  code: Scalars['String']['input'];
  /** 取得価格 */
  getPrice: Scalars['Float']['input'];
  /** 保有株数 */
  quantity: Scalars['Float']['input'];
};

export type CreateFixedIncomeAssetInput = {
  /** 資産名称 */
  code: Scalars['String']['input'];
  /** １年当たり配当利回り */
  dividendRate: Scalars['Float']['input'];
  /** 取得価格合計 */
  getPriceTotal: Scalars['Float']['input'];
  /** 配当支払い月 */
  paymentMonth: Array<Scalars['Int']['input']>;
  /** 購入時為替 */
  usdJpy?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateJapanFundInput = {
  /** ティッカーシンボル */
  code: Scalars['String']['input'];
  /** 取得価格 */
  getPrice: Scalars['Float']['input'];
  /** 取得価格総額 */
  getPriceTotal: Scalars['Float']['input'];
  /** 銘柄名 */
  name: Scalars['String']['input'];
};

export type CreateUsStockInput = {
  /** ティッカーシンボル */
  code: Scalars['String']['input'];
  /** 取得価格 */
  getPrice: Scalars['Float']['input'];
  /** 保有株数 */
  quantity: Scalars['Float']['input'];
  /** セクター */
  sector: Scalars['String']['input'];
  /** 購入時為替 */
  usdJpy: Scalars['Float']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Crypto = {
  __typename?: 'Crypto';
  /** ティッカーシンボル */
  code: Scalars['String']['output'];
  /** 現在価格 */
  currentPrice: Scalars['Float']['output'];
  /** 取得価格 */
  getPrice: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  /** 保有株数 */
  quantity: Scalars['Float']['output'];
};

export type FixedIncomeAsset = {
  __typename?: 'FixedIncomeAsset';
  /** 資産名称 */
  code: Scalars['String']['output'];
  /** １年当たり配当利回り */
  dividendRate: Scalars['Float']['output'];
  /** 取得価格合計 */
  getPriceTotal: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  /** 配当支払い月 */
  paymentMonth: Array<Scalars['Int']['output']>;
  /** 購入時為替 */
  usdJpy?: Maybe<Scalars['Float']['output']>;
};

export type JapanFund = {
  __typename?: 'JapanFund';
  /** ティッカーシンボル */
  code: Scalars['String']['output'];
  /** 現在価格 */
  currentPrice: Scalars['Float']['output'];
  /** 取得価格 */
  getPrice: Scalars['Float']['output'];
  /** 取得価格総額 */
  getPriceTotal: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  /** 銘柄名 */
  name: Scalars['String']['output'];
};

export type MarketPrice = {
  __typename?: 'MarketPrice';
  /** 現在価格 */
  currentPrice: Scalars['Float']['output'];
  /** 変化率 */
  currentRate: Scalars['Float']['output'];
  /** 変化額 */
  priceGets: Scalars['Float']['output'];
  /** ティッカーシンボル */
  ticker: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCrypto: Crypto;
  createFixedIncomeAsset: FixedIncomeAsset;
  createJapanFund: JapanFund;
  createUsStock: UsStock;
  createUser?: Maybe<User>;
};


export type MutationCreateCryptoArgs = {
  input: CreateCryptoInput;
};


export type MutationCreateFixedIncomeAssetArgs = {
  input: CreateFixedIncomeAssetInput;
};


export type MutationCreateJapanFundArgs = {
  input: CreateJapanFundInput;
};


export type MutationCreateUsStockArgs = {
  input: CreateUsStockInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  cryptos?: Maybe<Array<Crypto>>;
  currentUsdJpy: Scalars['Float']['output'];
  fixedIncomeAssets?: Maybe<Array<FixedIncomeAsset>>;
  japanFunds?: Maybe<Array<JapanFund>>;
  marketPrices: Array<MarketPrice>;
  usStocks?: Maybe<Array<UsStock>>;
  user?: Maybe<User>;
};


export type QueryMarketPricesArgs = {
  tickerList: Array<InputMaybe<Scalars['String']['input']>>;
};

export type UsStock = {
  __typename?: 'UsStock';
  /** ティッカーシンボル */
  code: Scalars['String']['output'];
  /** 現在価格 */
  currentPrice: Scalars['Float']['output'];
  /** 変化率 */
  currentRate: Scalars['Float']['output'];
  /** １年当たり配当 */
  dividend: Scalars['Float']['output'];
  /** 取得価格 */
  getPrice: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  /** 変化額 */
  priceGets: Scalars['Float']['output'];
  /** 保有株数 */
  quantity: Scalars['Float']['output'];
  /** セクター */
  sector: Scalars['String']['output'];
  /** 購入時為替 */
  usdJpy: Scalars['Float']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

export type MarketPricesQueryVariables = Exact<{ [key: string]: never; }>;


export type MarketPricesQuery = { __typename?: 'Query', marketPrices: Array<{ __typename?: 'MarketPrice', ticker: string, currentPrice: number, currentRate: number, priceGets: number }> };

export type UsStocksQueryVariables = Exact<{ [key: string]: never; }>;


export type UsStocksQuery = { __typename?: 'Query', usStocks?: Array<{ __typename?: 'UsStock', id: string, code: string, dividend: number, getPrice: number, quantity: number, sector: string, usdJpy: number, currentPrice: number, priceGets: number, currentRate: number }> | null };


export const MarketPricesDocument = gql`
    query marketPrices {
  marketPrices(
    tickerList: ["SPY", "XLE", "XLK", "SMH", "IBB", "XLV", "XLP", "XLU", "XLB", "XLY", "XLF", "XLI", "XLRE", "XME", "XRT", "ITA", "ICLN", "AGG", "GLD", "DBA"]
  ) {
    ticker
    currentPrice
    currentRate
    priceGets
  }
}
    `;

/**
 * __useMarketPricesQuery__
 *
 * To run a query within a React component, call `useMarketPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketPricesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMarketPricesQuery(baseOptions?: Apollo.QueryHookOptions<MarketPricesQuery, MarketPricesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MarketPricesQuery, MarketPricesQueryVariables>(MarketPricesDocument, options);
      }
export function useMarketPricesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketPricesQuery, MarketPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MarketPricesQuery, MarketPricesQueryVariables>(MarketPricesDocument, options);
        }
export function useMarketPricesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MarketPricesQuery, MarketPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MarketPricesQuery, MarketPricesQueryVariables>(MarketPricesDocument, options);
        }
export type MarketPricesQueryHookResult = ReturnType<typeof useMarketPricesQuery>;
export type MarketPricesLazyQueryHookResult = ReturnType<typeof useMarketPricesLazyQuery>;
export type MarketPricesSuspenseQueryHookResult = ReturnType<typeof useMarketPricesSuspenseQuery>;
export type MarketPricesQueryResult = Apollo.QueryResult<MarketPricesQuery, MarketPricesQueryVariables>;
export const UsStocksDocument = gql`
    query usStocks {
  usStocks {
    id
    code
    dividend
    getPrice
    quantity
    sector
    usdJpy
    currentPrice
    priceGets
    currentRate
  }
}
    `;

/**
 * __useUsStocksQuery__
 *
 * To run a query within a React component, call `useUsStocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsStocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsStocksQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsStocksQuery(baseOptions?: Apollo.QueryHookOptions<UsStocksQuery, UsStocksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsStocksQuery, UsStocksQueryVariables>(UsStocksDocument, options);
      }
export function useUsStocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsStocksQuery, UsStocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsStocksQuery, UsStocksQueryVariables>(UsStocksDocument, options);
        }
export function useUsStocksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsStocksQuery, UsStocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsStocksQuery, UsStocksQueryVariables>(UsStocksDocument, options);
        }
export type UsStocksQueryHookResult = ReturnType<typeof useUsStocksQuery>;
export type UsStocksLazyQueryHookResult = ReturnType<typeof useUsStocksLazyQuery>;
export type UsStocksSuspenseQueryHookResult = ReturnType<typeof useUsStocksSuspenseQuery>;
export type UsStocksQueryResult = Apollo.QueryResult<UsStocksQuery, UsStocksQueryVariables>;