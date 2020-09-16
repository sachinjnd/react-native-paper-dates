import * as React from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import DayRange from './DayRange'
import { daySize } from './utils'
import { Hoverable } from 'react-native-web-hover'

function EmptyDayPure() {
  return <View style={styles.empty} />
}
export const EmptyDay = React.memo(EmptyDayPure)

function Day(props: {
  day: number
  month: number
  year: number
  selected: boolean
  inRange: boolean
  leftCrop: boolean
  rightCrop: boolean
  primaryColor: string
  selectColor: string
  isToday: boolean
  onPressDate: (date: Date) => any
}) {
  const {
    day,
    month,
    year,
    selected,
    inRange,
    leftCrop,
    rightCrop,
    onPressDate,
    primaryColor,
    selectColor,
    isToday,
  } = props

  const onPress = React.useCallback(() => {
    onPressDate(new Date(year, month, day))
  }, [onPressDate, year, month, day])

  return (
    <View style={[styles.root]}>
      <DayRange
        inRange={inRange}
        leftCrop={leftCrop}
        rightCrop={rightCrop}
        selectColor={selectColor}
      />
      <Hoverable>
        {({ hovered }) => (
          <TouchableRipple
            borderless={true}
            onPress={onPress}
            style={[
              styles.button,
              { backgroundColor: inRange ? selectColor : '#fff' },
              hovered && styles.buttonHovered,
            ]}
          >
            <View
              style={[
                styles.day,
                isToday ? styles.today : null,
                selected ? { backgroundColor: primaryColor } : null,
              ]}
            >
              <Text style={selected ? styles.selectedText : null}>{day}</Text>
            </View>
          </TouchableRipple>
        )}
      </Hoverable>
    </View>
  )
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  button: {
    width: daySize,
    height: daySize,
    overflow: 'hidden',
    borderRadius: daySize / 2,
  },
  buttonHovered: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  day: {
    borderRadius: daySize / 2,
    width: daySize,
    height: daySize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  today: {
    borderColor: '#000',
  },
  selectedText: {
    color: '#fff',
  },

  flex1: {
    flex: 1,
  },
})

export default React.memo(Day)
