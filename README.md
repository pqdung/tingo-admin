# Coding convention

### Code language - Typescript

## Main structure in 'src' folder
**asset**: include asset as: images, ... <br/>
**components**: include all component of project <br/>
**layouts**: include all parts or components constitute layout of the web <br/>
**models**: include files about object model, interface, ... <br/>
**pages**: only include screens, pages <br/>
**routes**: include router navigate the pages of the web <br/>
**services**: include services call API <br/>
**store**: include redux, store, slice,... <br/>
**utils**: include files use to handle logic common <br/>

updating...

## Naming conventions
#### Use PascalCase in components, interfaces, or type aliases

```ts
// React component
const BannersEditForm = () => {
    //...
}

// Typescript interface
interface TodoItem {
  id: number;
  name: string;
  value: string;
}

// Typescript type alias
type TodoList = TodoItem[];
```

#### Use camelCase for data types like variables, arrays, objects, functions, etc.
```ts
const getLastDigit = () => {
    //...
}

const userTypes = [ 
    //...
]
```

#### Use camelCase for folder and non-component file names and PascalCase for component file names
```ts
src/utils/form.ts
src/hooks/useForm.ts
src/components/banners/edit/Form.tsx
```

## Component structure
To keep all the component files consistent, please follow the following pattern:

```tsx
// 1. Imports - Prefer destructuring imports to minimize writen code
import React, { PropsWithChildren, useState, useEffect } from "react";

// 2. Types
type ComponentProps = {
  someProperty: string;
};

// 2.1 Interface Props
interface Props {
  someProperty: string;
};

// 3. Styles - with @mui use styled API or sx prop of the component
const Wrapper = styled("div")(({ theme }) => ({
  color: theme.palette.white
}));

// 4. Additional variables
const SOME_CONSTANT = "something";

// 5. Component
function Component({ someProperty }: PropsWithChildren<ComponentProps>) {
  // 5.1 Definitions
  const [state, setState] = useState(true);
  const { something } = useSomething();

  // 5.2 Effects
  // ❌
  React.useEffect(() => {
    // ...
  }, []);

  // ✅
  useEffect(() => {
    // ...
  }, []);

  // 5.3 Functions
  function handleToggleState() {
    setState(!state);
  }

  // 5.4 Additional destructures
  const { property } = something;
  
  return (
    <div>
      {/* Separate elements if not closed on the same line to make the code clearer */}
      {/* ❌ */}
      <div>
        <div>
          <p>Lorem ipsum</p>
          <p>Pellentesque arcu</p>
        </div>
        <p>Lorem ipsum</p>
        <p>Pellentesque arcu</p>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque
          arcu. Et harum quidem rerum facilis est et expedita distinctio.
        </p>
        <p>Pellentesque arcu</p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque
          arcu. Et harum quidem rerum facilis est et expedita distinctio.
        </p>
      </div>

      {/* ✅ */}
      <Wrapper>
        <div>
          <p>Lorem ipsum</p>
          <p>Pellentesque arcu</p>
        </div>

        <p>Lorem ipsum</p>
        <p>Pellentesque arcu</p>
      </Wrapper>

      <div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            Pellentesque arcu. Et harum quidem rerum facilis est et expedita
            distinctio.
          </p>

          <p>Pellentesque arcu</p>

          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            Pellentesque arcu. Et harum quidem rerum facilis est et expedita
            distinctio.
          </p>
        </div>
      </div>
    </div>
  );
}

// 6. Exports
export { Component };
export type { ComponentProps };
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
