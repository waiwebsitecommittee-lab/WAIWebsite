import { useSearchParams } from 'react-router-dom';

import { formatString as i18n, getIndexByKey, useSettings } from '../helpers';
import { alertCss, errorCss } from '../styles';

import Button from './Button';

import type { State } from '../types';

export default function Alert({ state }: { state: State }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { settings, strings } = useSettings();
  return state.error ? (
    <div css={errorCss}>{state.error}</div>
  ) : state.alert ? (
    <>
      <div css={alertCss}>{state.alert}</div>
      {state.alert === strings.no_results && state.input.search && (
        <Button
          onClick={() => {
            searchParams.delete('search');
            setSearchParams(searchParams);
          }}
          text={i18n(strings.remove, { filter: `‘${state.input.search}’` })}
          icon="close"
        />
      )}
      {state.alert === strings.no_results &&
        settings.filters.map(filter =>
          state.input[filter].map(value => (
            <Button
              key={value}
              icon="close"
              onClick={() => {
                searchParams.delete(filter);
                setSearchParams(searchParams);
              }}
              text={i18n(strings.remove, {
                filter: getIndexByKey(state.indexes[filter], value)?.name,
              })}
            />
          ))
        )}
    </>
  ) : null;
}
