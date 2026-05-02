import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';

const QuantumList = ({ route }) => {
  // These params come from your BranchSelect screen
  const { branch, semester } = route.params; 
  const [quantums, setQuantums] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.x.x:5000/api/quantums/${branch}/${semester}`)
      .then(res => res.json())
      .then(json => setQuantums(json))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{branch} - Semester {semester} Quantums</Text>
      <FlatList
        data={quantums}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={{ padding: 20, backgroundColor: '#eee', marginTop: 10, borderRadius: 8 }}
            onPress={() => Linking.openURL(item.pdfUrl)}
          >
            <Text>{item.subjectName}</Text>
            <Text style={{ color: 'blue', fontSize: 12 }}>Tap to Download PDF</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default QuantumList;