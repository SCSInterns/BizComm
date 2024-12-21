import { useState, useEffect } from 'react';
import axios from 'axios';

const useContactSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('/api/v1/clients');
                const sortedContacts = response.data.clients; 
                setContacts(sortedContacts);
                setFilteredContacts(sortedContacts); 
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };
        fetchContacts();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            const filtered = contacts.filter(contact =>
                contact.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredContacts(filtered);
        } else {
            setFilteredContacts(contacts); 
        }
    }, [searchQuery, contacts]);

    return { searchQuery, filteredContacts, handleSearch };
};

export default useContactSearch;
