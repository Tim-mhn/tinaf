import { component } from 'tinaf/component';
import { Divider } from './components';

export const DocPageLayout = component<{ title: string }>(
  ({ children = [], title }) => {
    return (
      <div className="flex flex-col gap-10">
        <h2 className="text-6xl">{title}</h2>
        <Divider />

        {...children}
      </div>
    );
  }
);
