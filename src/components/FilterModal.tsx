import React, { memo, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { CANCEL, DONE, FILTERS, SHIPMENT_STATUS } from "../constants/stringConstants";
import { useAuthStore } from "../store/useAuthStore";

const filterList = [
  'Received',
  'Putaway',
  'Delivered',
  'Canceled',
  'Rejected',
  'Lost',
  'On Hold'
]

const FilterModal = ({ isModalVisible, closeModal }: {
  isModalVisible: boolean,
  closeModal: () => void
}) => {
  const { applyFilter, markAll } = useAuthStore();
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const onApplyFilter = (filter: string) => {
    setAppliedFilters([...appliedFilters, filter]);
  }

  const onPressDone = () => {
    closeModal();
    setAppliedFilters([])
    applyFilter(appliedFilters);
  }

  return (
    <Modal isVisible={isModalVisible}
      style={styles.mainContainer}
      useNativeDriver
      backdropOpacity={0.8}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
    >
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Pressable onPress={closeModal}>
            <Text style={styles.actionTextStyle}>{CANCEL}</Text>
          </Pressable>
          <Text style={styles.filtersTextStyle}>{FILTERS}</Text>
          <Pressable onPress={onPressDone}>
            <Text style={styles.actionTextStyle}>{DONE}</Text>
          </Pressable>
        </View>
        <Text style={styles.shipmentStatusTextStyle}>{SHIPMENT_STATUS}</Text>
        <View style={styles.filterWrapperContainer}>
          {
            filterList.map((filter, index) => {
              const isSelectedFilter = appliedFilters.includes(filter);
              return (
                <Pressable style={isSelectedFilter ? styles.selectedFilterContainer : styles.filterContainer} key={index} onPress={() => onApplyFilter(filter)}>
                  <Text style={[styles.filterTextStyle, { color: isSelectedFilter ? '#2F50C1' : '#58536E' }]}>{filter}</Text>
                </Pressable>
              )
            })
          }
        </View>
      </View>
    </Modal>
  );
}
export default memo(FilterModal);

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 260,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    paddingVertical: 16
  },
  filterWrapperContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  filterContainer: {
    backgroundColor: '#F4F2F8',
    padding: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10
  },
  selectedFilterContainer: {
    backgroundColor: '#F4F2F8',
    padding: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6E91EC'
  },
  filterTextStyle: {
    fontSize: 16,
    color: '#58536E'
  },
  shipmentStatusTextStyle: {
    fontSize: 13,
    color: '#58536E',
    marginTop: 12,
    marginBottom: 2
  },
  actionTextStyle: {
    color: '#2F50C1',
    fontSize: 16,
    fontWeight: '500'
  },
  filtersTextStyle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '500'
  }

});