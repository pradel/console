import * as React from 'react' // tslint:disable-line
import { StringCell } from '../StringCell'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { FieldType } from '../../../../../types/types'
import { TypedValue } from '../../../../../types/utils'

test('StringCell renders', () => {
  const save = jest.fn((value: TypedValue) => {
    /* */
  })
  const cancel = jest.fn()
  const onKeyDown = jest.fn()
  const field = {
    id: 'cip3p48sj001e1jsmghwkdt2k',
    name: 'description',
    description: '',
    isReadonly: true,
    isList: false,
    isSystem: true,
    typeIdentifier: 'String' as FieldType,
    relatedModel: null,
    isUnique: true,
    isRequired: false,
    enumValues: [],
    model: null,
  }

  const component = shallow(
    <StringCell
      value="some string"
      save={save}
      cancel={cancel}
      onKeyDown={onKeyDown}
      field={field}
    />,
  )

  expect(shallowToJson(component)).toMatchSnapshot()
})
