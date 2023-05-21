import { db } from '../database.js';
import axios from 'axios';

export async function getPersonalAddresses(req, res) {
  // I request the set of addresses that belong to the user
  // I perform a query to the database
  const addresses = await db.Address.findMany({ where: { userId: req.user.id}, })
    // I send the addresses back to the client but remove the userId and createdAt fields from the response
    res.json(addresses.map(address => ({id: address.id,
        streetL1: address.line1,
        streetL2: address.line2,
        city: address.city,
        country: address.country,
        zip: address.zip,
        createdAt: address.createdAt})));
}

export async function getPersonalAddressById(req, res) {
    const address = await db.Address.findUnique({ where: { id: Number(req.params.addressId) }, });
    res.json({
        streetL1: address.line1,
        streetL2: address.line2,
        city: address.city,
        country: address.country,
        zip: address.zip,
        createdAt: address.createdAt});
    }

export async function createPersonalAddress(req, res) {
    // We verify that the user has provided all the required fields
    if (!req.body.streetL1 || !req.body.city || !req.body.country || !req.body.zip) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    // The country API is of course down the day before the demo, so we do an ad-hoc fix
    // let country;
    // try{
    //     country = await axios.get(`https://restcountries.com/v3.1/name/${req.body.country}`);
    // } catch (error) {
    //     return res.status(404).json({ message: 'Country not found' });
    // }
    if (!['france', 'suisse'].includes(req.body.country.toLowerCase())) {
        return res.status(404).json({ message: 'Country not found' });
    }

    const alpha2code = req.body.country.toLowerCase() === 'france' ? 'FRA' : 'CHE';
    // let response;
    // The zip code API is of course down the day before the demo, so we ignore ZIP code validation
    // try{
    //     response = await axios.get(`https://api.zippopotam.us/${alpha2code}/${req.body.zip}`);
    // } catch (error) {
    //     return res.status(404).json({ message: 'Zip code not found' });
    // }

    // I verify that that the city and zip code match, it loops through the places in the response
    // let cityFound = false;
    // for (let i = 0; i < response.data.places.length; i++) {
    //     if (response.data.places[i]['place name'].toLowerCase() === req.body.city.toLowerCase()) {
    //         cityFound = true;
    //         req.body.city = response.data.places[i]['place name'];
    //         break;
    //     }
    // }
    // I anticipate the error if the city and zip code do not match
    // if (!cityFound) {
    //     return res.status(400).json({ message: 'City and zip code do not match' });
    // }

    // I create the address in the database
    const address = await db.Address.create({
        data: {
            line1: req.body.streetL1,
            line2: req.body.streetL2,
            city: req.body.city,
            country: alpha2code,
            zip: req.body.zip,
            userId: req.user.id,
        }
    });
    // I send the address back to the client
    res.json({
        id: address.id,
        streetL1: address.line1,
        streetL2: address.line2,
        city: address.city,
        country: address.country,
        zip: address.zip,
        createdAt: address.createdAt,
    });
}

export async function removePersonalAddress(req, res) {
    if (isNaN(Number(req.params.addressId))) {
        return res.status(400).json({ message: 'Invalid address ID' });
    }

    // Verify authenticated
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // We verify that the request address does exist
    const address = await db.Address.findUnique({ where: { id: Number(req.params.addressId) }, });
    if (!address) {
        return res.status(404).json({ message: 'Address not found' });
    }
    // We verify that the request address belongs to the user
    if (address.userId !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    // We delete the address
    await db.Address.delete({ where: { id: Number(req.params.addressId) }, });
    res.json({ message: 'Address deleted' });
}
